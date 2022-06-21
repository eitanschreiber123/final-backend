import { gql } from "apollo-server-express";

export const typeDefs = gql`
type AvailabilityType {
    Sunday: String
    Monday: String
    Tuesday: String
    Wednesday: String
    Thursday: String
    Friday: String
    Saturday: String
}

type CategoryItemType {
    name: String
    price: Float
    image: String
    cropped: String
    availability: AvailabilityType
    description: String
}

type CategoryType {
    name: String
    items: [CategoryItemType]
}

type OrderItemType {
    name: String
    price: Float
    qty: Float
}

type OrderType {
    name: NameType
    id: String
    price: Float
    status: String
    date: String
    time: String
    type: String
    categories: [String]
    items: [OrderItemType]
}

type HoursType {
    from: String
    to: String
}

type AddressType {
    line1: String
    city: String
    state: String
}

type LocationType {
    lat: Float
    lng: Float
}

type NameType {
    first: String
    last: String
}

type OwnerType {
    name: NameType
    phonenumber: String
    email: String
}

type RestaurantType {
    id: String
    owner: OwnerType
    name: String
    image: String
    backgroundImage: String
    location: LocationType
    address: AddressType
    phonenumber: String
    hours: HoursType
    description: String
    status: String
    unavailableItems: [String]
    categories: [CategoryType]
    orders: [OrderType]
}

type Query {
  allData(id: String): RestaurantType
  order(id: String, orderNumber: String): OrderType
}

type Mutation {
  addCategory(id: String, name: String): [CategoryType]
  changeRestStatus(id: String, status: String): RestaurantType
  updateOwner(id: String, first: String, last: String, email: String, phonenumber: String): RestaurantType
  addItem(id: String, category: String, name: String, image: String, price: Float, desc: String, Sunday: String, Monday: String, Tuesday: String, Wednesday: String, Thursday: String, Friday: String, Saturday: String): [CategoryType]
  editItem(id: String, category: String, oldname: String, newName: String, image: String, price: Float, desc: String, Sunday: String, Monday: String, Tuesday: String, Wednesday: String, Thursday: String, Friday: String, Saturday: String): [CategoryItemType]
  editCategory(id: String, oldName: String, newName: String): [CategoryType]
  removeCategory(id: String, name: String): [CategoryType]
  removeItem(id: String, category: String, name: String): [CategoryType]
  changeOrderStatus(id: String, orderId: String, Status: String): [OrderType]
  updateRestaurantInfo(id: String, name: String, line1: String, city: String, state: String, phonenumber: String, from: String, to: String, description: String, image: String, backgroundImage: String): RestaurantType
  addNewRest(id: String, name: String, line1: String, city: String, state: String, phonenumber: String, from: String, to: String, description: String, image: String, backgroundImage: String, first: String, last: String, oEmail: String, oPhone: String): RestaurantType
  removeRest(id: String): [RestaurantType]
  addUnavailable(id: String, item: String): RestaurantType
  removeUnavailable(id: String, item: String): RestaurantType
}
`;
