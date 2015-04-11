# ISSYL
--------------


It's So Short You'll LOL (Most Likely!)
----------------------------------------

This is a URL shortner built using Node.js and Redis. The live app is hosted on Heroku, which  asks for credit card details to use Redis, but doesn't ask one for PostgresSQL. To overcome this limitation (sort of!), I used RedisLabs.com to directly create a hosted instance of Redis and then used it in my app, by configuring the instance directly from the index.js file.

Another good learning experience from building this project, was learning how to get a  domain and then configuring a DNS to point at the herokuapp with the new custom domain. The code is released under MIT license.


