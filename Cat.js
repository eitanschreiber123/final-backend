import mongoose from "mongoose";
import Data from './data.js';

const AvailabilitySchema = mongoose.Schema({ Sunday: String, Monday: String, Tuesday: String, Wednesday: String, Thursday: String, Friday: String, Saturday: String })
const CategoryItemSchema = mongoose.Schema({ name: String, price: Number, image: String, cropped: String, availability: AvailabilitySchema, description: String })
const OrderItemSchema = mongoose.Schema({ name: String, price: Number, qty: Number })
const HoursSchema = mongoose.Schema({ from: String, to: String });
const AddressSchema = mongoose.Schema({ line1: String, city: String, state: String });
const LocationSchema = mongoose.Schema({ lat: Number, lng: Number });
const NameSchema = mongoose.Schema({ first: String, last: String });
const OwnerSchema = mongoose.Schema({ name: NameSchema, phonenumber: String, email: String });
const CategorySchema = mongoose.Schema({ name: String, items: [CategoryItemSchema] })
const OrderSchema = mongoose.Schema({ name: NameSchema, id: String, price: Number, status: String, date: String, time: String, type: String, categories: [String], items: [OrderItemSchema] })
const RestaurantSchema = new mongoose.Schema({id: String, owner: OwnerSchema, name: String, image: String, backgroundImage: String, location: LocationSchema, address: AddressSchema, phonenumber: String, hours: HoursSchema, description: String, status: String, unavailabeItems: [String], categories: [CategorySchema], orders: [OrderSchema] })

export const RestaurantType = new mongoose.model("RestaurantType", RestaurantSchema);
export const OrderType = new mongoose.model("OrderType", OrderSchema);
export const CategoryType = new mongoose.model("CategoryType", CategorySchema);
export const OwnerType = new mongoose.model("OwnerType", OwnerSchema);
export const NameType = new mongoose.model("NameType", NameSchema);
export const LocationType = new mongoose.model("LocationType", LocationSchema);
export const AddressType = new mongoose.model("AddressType", AddressSchema);
export const HoursType = new mongoose.model("HoursType", HoursSchema);
export const OrderItemType = new mongoose.model("OrderItemType", OrderItemSchema);
export const CategoryItemType = new mongoose.model("CategoryItemType", CategoryItemSchema);
