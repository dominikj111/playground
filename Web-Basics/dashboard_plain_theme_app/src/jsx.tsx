import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import Symbols from './symbols'

const app = new Hono()

const Layout = (props: { children?: any }) => {
  return (
    <html lang='en'>
      <head>
        <title>A Simple Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Hono" />
        <meta name="author" content="Hono" />
        <meta name="generator" content="Hono" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@1.1.0/modern-normalize.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/reset.css" />
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>
        {props.children}
        <script src="/app.js" />
        <script src="/init.js" />
      </body>
    </html>
  )
}

const Top = (props: { messages: string[] }) => {
  return (
    <Layout>
      <Symbols />
      {/* <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul> */}
      <header id="main-header">
        <nav>
          <button id="main-header__sidebar-toggle">
            <svg id="toggle-icon-menu">
              <use xlink:href="#icon-menu"></use>
            </svg>
            <svg id="toggle-icon-close">
              <use xlink:href="#icon-close"></use>
            </svg>
          </button>

          <ul>
            <li id="main-header__logo">
              <a href="index.html">
                <svg>
                  <use xlink:href="#logo"></use>
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlink:href="#icon-house"></use>
                </svg>
                <span>local-wp</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlink:href="#icon-top-comments"></use>
                </svg>
                <span>2</span>
              </a>
            </li>

            <li>
              <a href="#">
                <svg>
                  <use xlink:href="#icon-add"></use>
                </svg>
                <span>New</span>
              </a>
            </li>
          </ul>

          <a href="#">
            <span>Welcome, admin</span>
            <svg>
              <use xlink:href="#icon-user"></use>
            </svg>
          </a>
        </nav>
      </header>

      <section id="main">
        <div id="overlay"></div>

        <div id="sidebar">
          <button id="sidebar__collapse">
            <svg>
              <use xlink:href="#icon-collapse"></use>
            </svg>
            <span>Collapse menu</span>
          </button>

          <nav id="sidebar__nav">
            <ul>
              <li class="menu-heading"><span>Manage</span></li>
              <li>
                <a href="#" class="active">
                  <svg>
                    <use xlink:href="#icon-dashboard"></use>
                  </svg>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-appearance"></use>
                  </svg>
                  <span>Appearance</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-plugins"></use>
                  </svg>
                  <span>Plugins</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-users"></use>
                  </svg>
                  <span>Users</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-settings"></use>
                  </svg>
                  <span>Settings</span>
                </a>
              </li>
              <li class="menu-heading"><span>Content</span></li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-posts"></use>
                  </svg>
                  <span>Posts</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-media"></use>
                  </svg>
                  <span>Media</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-pages"></use>
                  </svg>
                  <span>Pages</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use xlink:href="#icon-comments"></use>
                  </svg>
                  <span>Comments</span>
                </a>
              </li>
            </ul>
          </nav>

          <div id="sidebar__theme-switcher">
            <svg id="sidebar__theme-switcher__sun">
              <use xlink:href="#icon-sun"></use>
            </svg>

            <svg id="sidebar__theme-switcher__moon">
              <use xlink:href="#icon-moon"></use>
            </svg>
          </div>
        </div>

        <div id="main-content">
          <div id="main-content__container">
            <p>This is the page content</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))
app.use('/reset.css', serveStatic({ path: './public/reset.css' }))
app.use('/app.js', serveStatic({ path: './public/app.js' }))
app.use('/app.css', serveStatic({ path: './public/app.css' }))
app.use('/init.js', serveStatic({ path: './public/init.js' }))

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  const foo = <Top messages={messages} />
  return c.html(foo)
})

const port = parseInt(process.env.PORT!) || 3000
console.log(`Running at http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch
};
