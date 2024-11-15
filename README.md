To run locally, first run:
npm i

to install all necessary dependencies.

Then simply run: npm run dev

to run the app on localhost:3000.

Go to localhost:3000 in your browser to view the app.

When selecting a state or topic, to clear either filter click on "--Select a State--" or "--Select a Topic--".

You can search as well by keywords in title or description.

To fetch new articles, the script can be ran as a node script, or as a function:
-As a function simply press the "Get New Articles" button on the home page and refresh the page to see the new articles populate.
-As a script enter this command into the terminal - npx tsx ./src/scripts/fetch-articles.ts, which will run the script and populate the database with the new articles. (You might need to refresh the page to see the changes).

Click on the images to go to each Article page.

Click the "show more" and "show less" button under each articles description to expand descriptions.

Note: The only buttons that dont function are the "Request a Demo", "Pro Features", and "Log In" buttons in the NavBar component.

SYSTEM DESIGN AND COMMENTS:

I built this application with Next.js, using the App Router model. For wireframing the design, UX and documentation, I used Eraser.io. I used tailwind for styling and created custom components that are reusable accross the app. I used SqLite for the database and Prisma as an ORM to create the Datebase schema, and interact with the Datebase.

I wrote a script that can be run as a node script, or as a function. I also created a Next.Js internal route (Get request) which can be called to run the function and update the Database with new articles by clicking a button on the home page.

I also created dynamic page routes, which takes in the id of the article dynamically through the url path. I leveraged Next.JS' Link component, which prerenders pages as you hover over the article link, for a faster load time.

Additionally, I have a constants folder where the constants are kept for State and Topic filters. In the future, these can also be dynamically set from the Database, in case more topics need to be added, for example.

ASSUMPTIONS:

One thing in particular I came across that wasnt clear was the caching. Since the choice was given to use dummy data or utilize one of the news apis, chaching wouldnt be an issue for such small amounts of data. I pulled news articles from two different sources and it only returned back a little over 100 articles, so I wasnt sure why caching was requested on such a small dataset.

IMPROVEMENTS:
While this is a minimal version of the app, there are certainly many ways I would improve it, given more time. Also, I would use Server Side Rendering (SSR) where possible, such as loading article pages. This causes pages to load faster, as its possible to store pages in the server cache and can leverage edge runtime of Vercel to deliver content faster. SSR also drastically improves SEO performance, as Google crawlers never miss indexing your page, since its rendered on the server and delivered all at once. Google rewards websites very kindly for this.

Additionally, I would improve the structure of the app, and seperate the resusable api calls into more organized folders. Currently I am writing alot of the calls and functions on the pages, since there are only 2 pages. I would do the same with Components, and make them as reusable as possible such as Buttons, Search Bars, Dropdowns etc. To avoid repeating code when possible, is essential.

Also, currently, I am calling the search api on every keystroke, when I should be using a debouncer to limit the api calls, in a fast burst of keystrokes. This will make it so the api calls are called less, which is always good when possible.

News Aggregation:

- Describe in your README how you would aggregate news articles from multiple sources. How would you handle deduplication, store articles, and ensure fresh data?

-The api calls are dynamic, so it's possible to pass in multiple news api sources, convert those news articles to fit the database schema, and store those articles in the database with primary keys.

-To handle and avoid deduplication, I could make checks upon insert to ensure data with the same primary key doesn't exist. If duplicative data that somehow enters the system needs to be deleted(it shouldn't with proper set up), a script can be run that retrieves all data with duplicate primary keys, and removes the duplicates.

Scalability:

- Discuss how the system could handle thousands of news articles across multiple states and topics. Would you index the articles? What storage strategies would you use?

Yes, I would index articles depending on which database is being used. Both sql and no-sql database providers such as mongoDB offer indexing capabilities. This will speed up the response times of the calls by making sure that often searched parameters are indexed.

Search Optimization:

- Consider how you would make searching through potentially large datasets efficient.

If moving past traditional SQL querying is needed, it's possible to implement search engines like Elasticsearch or Typesense which are designed to deal with large volumes of data. Using caching mechanisms and maintaining indexing properly could help optimize the database queries improving search performance through large datasets.
