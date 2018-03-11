const db = require('../db')
const { User, Outfit, Wardrobe, Item } = require('../db/models')

const users = [
    {
        firstName: 'David',
        lastName: 'Sehl',
        email: 'davidjsehl@gmail.com',
        // photoUrl: 'https://avatars2.githubusercontent.com/u/12431338?s=460&v=4',
        password: 'password',
        isAdmin: true,
        // userId: 1
    },
    {
        firstName: 'Johnny',
        lastName: 'Rocket',
        email: 'jrocket@gmail.com',
        // photoUrl: 'https://avatars1.githubusercontent.com/u/15680221?s=460&v=4',
        password: 'password',
        isAdmin: false,
        // userId: 2
    },
    {
        firstName: 'Pontiac',
        lastName: 'Carr',
        email: 'pcarr@gmail.com',
        // photoUrl: 'https://avatars1.githubusercontent.com/u/30578065?s=460&v=4',
        password: 'password',
        isAdmin: false,
        // userId: 3
    },
    {
        firstName: 'Leslie',
        lastName: 'McGee',
        email: 'lmcgee@gmail.com',
        // photoUrl: 'https://avatars2.githubusercontent.com/u/16891417?s=460&v=4',
        password: 'password',
        isAdmin: false,
        // userId: 4
    }
];

const items = [
    {
        category: 'Sweaters',
        color: 'Green',
        imageUrl: 'http://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc3dd0e40/images/hi-res/50580_GLDG.jpg?sw=750&sh=750&sm=fit&sfrm=png',
        wardrobeId: 1,
        outfitId: 1
    },
    {
        category: 'Jeans',
        color: 'Blue',
        imageUrl: 'https://riverisland.scene7.com/is/image/RiverIsland/293654_main?wid=1200',
        wardrobeId: 1,
        outfitId: 1
    },
    {
        category: 'Jackets',
        color: 'Green',
        imageUrl: 'https://stylestox.com/products/mens-jacket-spring-and-autumn-available-4-colors-black-gray-green-khaki',
        wardrobeId: 1,
        outfitId: 1
    },
    {
        category: 'Sweaters',
        color: 'Blue',
        imageUrl: 'https://dimg.dillards.com/is/image/DillardsZoom/nav/murano-modern-performance-v-neck-sweater/05105974_zi_blue.jpg',
        wardrobeId: 1,
        outfitId: null
    },
    {
        category: 'T-Shirts',
        color: 'White',
        imageUrl: 'http://static.thefrisky.com/uploads/2011/08/12/mens_button-down_shirt_8-12_m-425x464.jpg',
        wardrobeId: 2,
        outfitId: null
    },
    {
        category: 'Pants',
        color: 'Brown',
        imageUrl: 'https://static.campmor.com/wcsstore/Campmor/static/images/items/larger/M0669mao.jpg',
        wardrobeId: 2,
        outfitId: null
    },
    {
        category: 'Jackets',
        color: 'Beige',
        imageUrl: 'https://image.dhgate.com/0x0/f2/albu/g5/M00/64/49/rBVaI1hxsmyAFCuRAAJkGkZtn84557.jpg',
        wardrobeId: 2,
        outfitId: null
    },
]

const wardrobes = [
    {
        name: 'Davids Wardrobe',
        userId: 1
    },
    {
        name: 'Johnnys Wardrobe',
        userId: 2
    },
    {
        name: 'Pontiacs Wardrobe',
        userId: 3
    },
    {
        name: 'Leslies Wardrobe',
        userId: 4
    },

]

const outfits = [
    {
        name: 'Default Fit',
        userId: 1,
    }
]

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  )
    .then(() =>
    Promise.all(wardrobes.map(wardrobe =>
        Wardrobe.create(wardrobe))
    )
    .then(() =>
    Promise.all(outfits.map(outfit =>
        Outfit.create(outfit))
    )
    .then(() =>
    Promise.all(items.map(item =>
        Item.create(item))
    )
    ))
);


const main = () => {
    console.log('Syncing db...');
    db.sync({ force: true })
        .then(() => {
            console.log('Seeding database...');
            return seed();
        })
        .catch(err => {
            console.log('Error while seeding');
            console.log(err.stack);
        })
        .then(() => {
            db.close();
            return null;
        });
};

main();
