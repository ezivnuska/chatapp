import { PrivateValueStore } from '@react-navigation/native'
import { serialize } from 'mongodb/node_modules/bson'
import React, { useEffect, useRef, useState } from 'react'
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Canvas from 'react-native-canvas'

const { height, width } = Dimensions.get('window')

let interval
const ArtBoard = () => {
    const [mounted, setMounted] = useState(false)
    let bees = []
    const maxBees = 1
    const centerX = width / 2
    const centerY = height / 2
    // const target = { x:centerX, y: centerY}
    const speed = .2
    const distance = 50
    const distanceX = ({ x, target }) => Math.abs(x - target.x) * speed
    const distanceY = ({ y, target }) => Math.abs(y - target.y) * speed
    // const newCoords = ({ x, y, target }) => ({ x: differenceX, y: differenceY })

    const newBee = (x, y) => {
        const newTarget = getNewTarget(x, y)
        return ({
            x,
            y,
            target: newTarget,
            targets: [{ x, y }],
        })
    }
    
    const getNewTarget = (x, y) => ({ x: x + distance, y: y + (distance / 2) })
    
    const addBees = () => {
        const hive = []
        for(let i = 0; i < maxBees; i++) {
            const b = newBee(centerX, centerY)
            hive.push(b)
        }
        console.log('bees before setting', bees)
        bees = hive
        console.log('bees after setting', bees)
        // interval = setInterval(advance, 5000)
    }

    const advance = () => {
        console.log('advance() -->', bees)
        console.log('advancing (bees.length)', bees.length)
        if (!bees.length) return

        const advanced = bees.map(bee => {
            console.log('advancing bee', bee)
            
            const { x, y, target, targets } = bee
            let newX = x + Math.abs(target.x - x) / 2
            let newY = y + Math.abs(target.y - y) / 2
            console.log('distanceX', distanceX({ x, target }))
            console.log('distanceY', distanceY({ y, target }))
            console.log('newY', newY)
            console.log('newX', newX)
            console.log('newY', newY)
            let newTarget = null
            console.log(newX, target.x)
            console.log(newY, target.y)
            if (Math.abs(newX - target.x) <= 1) {
                console.log('getting new target')
                newX = target.x
                newY = target.y
                newTarget = getNewTarget(newX, newY)
            }
            const newBee = {
                x: newX,
                y: newY,
                target: newTarget ? newTarget : target,
                targets: newTarget ? [...targets, newTarget] : [...targets],
            }
            console.log('newBee', newBee)
            return newBee
        })
        console.log('advanced', advanced)
        bees = advanced
        const canvas = document.getElementById('canvas')
        draw(canvas)
    }

    useEffect(() => {
        console.log('bees updated', bees)

        // const array = bees.map(bee => ({ a: bee.x, b: bee.y }))
        // console.log('array', array)
        console.log('interval', interval)
        if (!interval) {
            console.log('setting interval')
            // interval = setInterval(advance, 2000)
        }
    }, [bees])

    useEffect(() => {
        setMounted(true)
        console.log('adding beezzzzzzz')
        addBees()
        // interval = setInterval(advance, 5000)
        // draw()
        
        return () => {
            setMounted(false)
            console.log('Canvas unmounting...')
        }
    }, [])

    // coinflip = value => {
    //     const toss = Math.floor(Math.random() * 2)
    //     if (toss === 0) return this.lastPoint().y - value
    //     return this.lastPoint().y + value
    // }

    // randomValue = () => Math.round(Math.random() * this.maxChange)

    const handleCanvas = canvas => {
        console.log('handleCanvas called')
        if (!mounted || !canvas) {
            console.log('ArtBoard not mounted OR canvas not found.')
            return null
        }
        console.log('handleCanvas:bees', bees)
        // let currentIndex = 0
        draw(canvas)
    }

    const draw = canvas => {
        var ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = 'darkblue'
        ctx.fillRect(0, 0, width, height)
        ctx.beginPath()
        console.log('bees.length', bees)
        for(let i = 0; i < bees.length; i++) {
            const b = bees[i]
            console.log('drawing bee:', b)
            const targets = b.targets
            ctx.moveTo(targets[0].x, targets[0].y)
            if (targets.length > 1) {
                for (let j = 1; j < targets.length; j++) {
                    const currentTarget = targets[j]
                    console.log('currentTarget', j, currentTarget)
                    console.log('lineTo', currentTarget.x, currentTarget.y)
                    ctx.lineTo(currentTarget.x, currentTarget.y)
                }
            }
            ctx.lineTo(b.x, b.y)
        }

        // currentIndex++
        // while(currentIndex < points.length - 1) {
            //     let point = points[currentIndex]
            //     ctx.lineTo(point.x, point.y)
            //     currentIndex++
            // }
        // for(let i = 1; i < b.targets.length; i++) {
        //     const target = b.targets[i]
        //     ctx.lineTo(target.x, target.y)
        // }
        // ctx.lineTo(b.x, b.y)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#fff'
        ctx.stroke()
    }

    // renderButton = () => {
    //     return this.state.interval !== undefined ? (
    //         <button onClick={this.stopInterval}>stop</button>
    //     ) : (
    //         <button onClick={this.startInterval}>start</button>
    //     )
    // }

    
    return Platform.OS === 'web' ? (
        <canvas id='canvas' height={height} width={width} ref={handleCanvas} />
    ) : (
        <Canvas id='canvas' height={height} width={width} ref={handleCanvas} />
    )
}

export default ArtBoard

const styles = StyleSheet.create({
    canvas: {
        margin: 0,
        padding: 0,
        height,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#f00',
        backgroundColor: '#000',
    }
})