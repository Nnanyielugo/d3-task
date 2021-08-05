## Syrup Tech Screener

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can view the live app [here](https://Nnanyielugo.github.io/d3-task)

#### Installing:
- clone or download this repository `git clone {repository url}`
- navigate to project directory
- install dependencies `npm install`
- start dev server `npm start`

#### Hosting
You can use any static hosting provider of your choice, but this project uses github pages for hosting. To host via gh-pages:
- in the project directory, replace the `homepage` field in `package.json` with your own `username.github.io/d3-task` url.
- run the deploy script `npm run deploy`

### Deliverables:
##### Switch between data sets:
Use the left dropdown to switch between `total revenue` annd `total volume`

##### Select date range:
Here I took the liberty of implntinng two types of interactions which can be selected bby using the dropdown on the right.
1. Tooltip and animated gradient line. The chart line is drawn via an animation whenever the create function is triggered either onn page load or via the `useEffect` hook as a result of page updates. Data along hovered points are viewed via a tooltip that follows mouse movement and a small circle that shows exact `x` `y` intersection.
2. Selectable date. Select time horizon and the chart will zoom in.
3. Download chart. Click the download button on the App bar, and the chart will be downloaded as pdf the way it appears on the screen.

#### Misc:
Used this as an opportunity to finally learn d3 so, thank you.
