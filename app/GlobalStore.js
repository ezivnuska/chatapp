import {
    observable,
    makeObservable,
    action,
    computed
} from 'mobx'

class GlobalStore {

    // User
    users = []
    user = {
        _id: '',
        email: '',
        username: '',
        // thumbnail: '',
    }
    
    updateUser = updated => this.user = updated
    updateAddress = address => this.user.address = Object.assign({}, address);

    constructor(user){
        makeObservable(this, {
            user: observable,
            updateUser: action,
        })
        this.user = user
    }

    // 'Orders'
    // orders = []
    // order = null
    
    // initOrders = list => this.orders = list
    // updateOrder = order => {
    //     const index = this.orders.findIndex(element => element._id === order._id)
    //     this.orders = index > -1 ? [
    //         ...this.orders.slice(0, index),
    //         order,
    //         ...this.orders.slice(index + 1),
    //     ] : this.orders
    // }
    
    // 'Order
    // initOrder = order => this.order = order
    // addOrder = order => this.orders = [...this.orders, order]
    // clearOrder = () => this.order = null
    // deleteOrder = id => this.orders = this.orders.filter(order => order._id !== id)
    
    // 'Locations
    
    // locations = []
    // location = null

    // initLocations = list => this.locations = list
    // updateLocation = location => {
    //     const index = this.locations.findIndex(element => element._id === location._id)
    //     this.initLocation(location)
    //     this.locations = index > -1 ? [
    //         ...this.locations.slice(0, index),
    //         location,
    //         ...this.locations.slice(index + 1),
    //     ] : this.locations
    // }
    
    // addLocation = location => this.locations.push(location)
    // initLocation = location => this.location = location
    // clearLocation = () => this.location = null
    // deleteLocation = id => this.locations = this.locations.filter(location => location._id !== id)

    // Vendor
    
    // vendors = []
    // vendor = null

    // initVendors = list => this.vendors = list
    // updateVendor = vendor => {
    //     const index = this.vendors.findIndex(element => element._id === vendor._id)
    //     this.initVendor(vendor)
    //     this.vendors = index > -1 ? [
    //         ...this.vendors.slice(0, index),
    //         vendor,
    //         ...this.vendors.slice(index + 1),
    //     ] : this.vendors
    // }
    
    // addVendor = vendor => this.vendors.push(vendor)
    // initVendor = vendor => this.vendor = vendor
    // clearVendor = () => this.vendor = null
    // deleteVendor = id => this.vendors = this.vendors.filter(vendor => vendor._id !== id)
    
    // 'Drivers'
    
    // drivers = []
    // driver = null
    
    // initDrivers = list => this.drivers = list
    // addDriver = driver => this.drivers.push(driver)
    // updateDriver = driver => {
    //     const index = this.drivers.findIndex(element => element._id === driver._id)
    //     this.initDriver(driver)
    //     this.drivers = index > -1 ? [
    //         ...this.drivers.slice(0, index),
    //         driver,
    //         ...this.drivers.slice(index + 1),
    //     ] : this.drivers
    // }
    // initDriver = driver => this.driver = driver
    // clearDriver = () => this.driver = null
    // deleteDriver = id => this.drivers = this.drivers.filter(driver => driver._id !== id)
}

// decorate(
//     GlobalStore,
//     {
//         // User
//         user: observable,
//         updateUser: action,

//         // Drivers
//         // drivers: observable,
//         // initDrivers: action,
//         // addDriver: action,
//         // updateDriver: action,
//         // initDriver: action,
//         // clearDriver: action,
//         // deleteDriver: action,
        
//         // Orders
//         // orders: observable,
//         // initOrders: action,
//         // addOrder: action,
//         // order: observable,
//         // initOrder: action,
//         // updateOrder: action,
//         // clearOrder: action,
//         // deleteOrder: action,
        
//         // Locations
//         // locations: observable,
//         // initLocations: action,
//         // addLocation: action,
//         // location: observable,
//         // initLocation: action,
//         // updateLocation: action,
//         // clearLocation: action,
//         // deleteLocation: action,
        
//         // Vendors
//         // vendors: observable,
//         // initVendors: action,
//         // addVendor: action,
//         // vendor: observable,
//         // initVendor: action,
//         // updateVendor: action,
//         // clearVendor: action,
//         // deleteVendor: action,
//     }
// )

export default new GlobalStore()