# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Book.destroy_all


guy = User.create(username: "guyfieriofficial", email: "guy@fieri.com", password: "hi", avatar: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.giantbomb.com%2Fuploads%2Fscale_medium%2F0%2F6087%2F2437349-pikachu.png&f=1", bio: "king of flavortown")
eric = User.create(username: "erickimofficial", email: "eric@kim.com", password: "hi", avatar: 'http://orig12.deviantart.net/345f/f/2007/275/b/0/pikachu_avatar_by_bakuranoshirts.jpg', bio: "*rap airhorn sounds*")

harrypotter = Book.create(title: "Harry potter and the cursed child", author:"jk rowling", description: "asdf", image: "https://m.media-amazon.com/images/I/91G2aMQuu9L._AC_UL872_FMwebp_QL65_.jpg", page_count: 500, published: "1999-1-1")
gameofthrones = Book.create(title: "A game of thrones", author:"grrm", description: "asdf", image: "https://images-na.ssl-images-amazon.com/images/I/518dkA0JEpL._SY346_.jpg", page_count: 600, published: "1990-12-12")
twilight = Book.create(title: "Twilight", author:"stephanie meyer", description: "asdf", image: "https://m.media-amazon.com/images/I/71HM1BhfdsL._AC_UL872_FMwebp_QL65_.jpg", page_count: 500, published: "2005-1-1")
crucible = Book.create(title: "The crucible", author:"arthur miller", description: "asdf", image: "google.com", page_count: 200, published: "1800-12-12")

ericpotter = UserBook.create(user: eric, book: harrypotter, shelf_type: "read")
ericgot = UserBook.create(user: eric, book: gameofthrones, shelf_type: "currentlyReading")
erictwilight = UserBook.create(user: eric, book: twilight, shelf_type: "wantToRead")

review1 = Review.create(content: "Meh I've read better, not very entertaining...", rating: 1, title: "My Dank Review", user: eric, book: gameofthrones)


p "i have been seeded"
