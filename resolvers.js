import { RestaurantType, OrderType, CategoryType, OwnerType, NameType, LocationType, AddressType, HoursType, OrderItemType, CategoryItemType } from "./Cat.js";
import Data from './data.js';
import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    allData: (_, { id }) => RestaurantType.findOne({id: id}),
    order: (_, { id, orderNumber }) => RestaurantType.findOne({id: id}).orders.findOne({id: orderNumber})
  },
  Mutation: {
    addCategory: (_, { id, name }) => {
      RestaurantType.findOneAndUpdate({id: id}, {$push: {categories: {name: name, items: []}}}).exec();
      return RestaurantType.findOne({id: id}).categories;
    },
    changeRestStatus: (_, { id, status }) => {
      RestaurantType.findOneAndUpdate({id: id}, {status: status}).exec()
      return RestaurantType.findOne({id: id});
    },
    updateOwner: (_, { id, first, last, email, phonenumber }) => {
      RestaurantType.findOneAndUpdate({id: id}, {owner: {name: {first: first, last: last}, email: email, phonenumber, phonenumber}}).exec()
      return RestaurantType.findOne({id: id});
    },
    addItem: (_, { id, category, name, image, price, desc, sunday, monday, tuesday, wednesday, thursday, friday, saturday }) => {
      RestaurantType.aggregate([{$match: {id: id}}, {$unwind: "$categories"}, {$match: {name: category}}, {$push: {items: {name: name, image: image, price: price, desc: desc, availability: {sunday: sunday, monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday}}}}]).exec();
        return  RestaurantType.findOne({id: id}).categories;
    },
    editItem: (_, { id, category, oldName, newName, image, price, desc, sunday, monday, tuesday, wednesday, thursday, friday, saturday  }) => {
        RestaurantType.aggregate([{$match: {id: id}}, {$unwind: "$categories"}, {$match: {name: category}}, {$unwind: "$items"}, {$match: { name: oldName}}, {$set: {name: newName, image: image, price: price, desc: desc, availability: {sunday: sunday, monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday}}}]).exec();
        return RestaurantType.findOne({id: id}).categories;
    },
    editCategory: (_, { id, oldName, newName }) => {
        RestaurantType.aggregate([{$match: {id: id}}, {$unwind: "$categories"}, {$match: {name: oldName}}, {$set: {name: newName}}]).exec();
        return RestaurantType.findOne({id: id}).categories;
    },
    changeOrderStatus: (_, { id, orderId, status }) => {
      RestaurantType.aggregate([{$match: {id: id}}, {$unwind: "$orders"}, {$match: {id: orderId}}, {$set: {status: status}}])
      return RestaurantType.findOne({id: id}).orders;
    },
    updateRestaurantInfo: (_, { id, name, line1, city, state, phonenumber, from, to, description, image, backgroundImage }) => {
        RestaurantType.findOneAndUpdate({id: id}, {name: name, phonenumber: phonenumber, description: description, image: image, backgroundImage: backgroundImage, address: {line1: line1, city: city, state: state}, hours: {from: from, to: to}}).exec()
        return RestaurantType.findOne({id: id});
    },
    addNewRest: (_, { id, name, line1, city, state, phonenumber, from, to, description, image, backgroundImage, first, last, oEmail, oPhone }) => {
        const newUser = RestaurantType.create({id, name, owner: {name: {first, last}, email: oEmail, phonenumber: oPhone}, address: {line1, city, state}, phonenumber, hours: {from, to}, description, image, backgroundImage, status: "not busy", location: {lat: 0, lng: 0}, categories: [], orders: [] })
        return RestaurantType.findOne({id: id})
    },
    removeCategory: (_, { id, name }) => {
      RestaurantType.findOneAndUpdate({id: id}, {$pull: {categories: {name: name}}}).exec();
      return RestaurantType.findOne({id: id}).categories;
},
removeItem: (_, { id, category, name }) => {
RestaurantType.aggregate([{$match: {id: id}}, {$unwind: "$categories"}, {$match: {name: category}}, {$pull: {items: {name: name}}}]).exec();
return RestaurantType.findOne({id: id}).categories;
},
removeRest: (_, { id }) => {
RestaurantType.deleteOne({id: id}).exec()
return RestaurantType.find()
},
addUnavailable: (_, { id, item }) => {
RestaurantType.findOneAndUpdate({id: id}, {$push: {unavailableItems: item}}).exec();
return RestaurantType.findOne({id: id});
},
removeUnavailable: (_, { id, item }) => {
  RestaurantType.findOneAndUpdate({id: id}, {$pull: {unavailableItems: item}}).exec();
  return RestaurantType.findOne({id: id});
}}};
