import { Button } from "primereact/button";
// import { invoke } from "@tauri-apps/api/tauri";
import { TabMenu } from 'primereact/tabmenu';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Menubar } from 'primereact/menubar';
import { ContextMenu } from 'primereact/contextmenu';
import { TabView, TabPanel } from 'primereact/tabview';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { NodeService } from "./data/menu";
import { Tree } from 'primereact/tree';
import { useContext, useEffect, useState } from "react";
import Gridcontent from './gridcontent';
import Toolbar from './Toolbar';

import { Context as ThemeContext } from './ThemeContext';


const items = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    command: () => {
      console.log("test")
    }
  },
  {
    label: 'Transactions',
    icon: 'pi pi-chart-line',
    command: () => {
      console.log("test")
    }
  },
  {
    label: 'Products',
    icon: 'pi pi-list',
    command: () => {
      console.log("test")
    }
  },
  {
    label: 'Messages',
    icon: 'pi pi-inbox',
    command: () => {
      console.log("test")
    }
  }
];
const items2 = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];
const home = { icon: 'pi pi-home', url: 'https://primereact.org' }
const items3 = [
  {
    label: 'Translate',
    icon: 'pi pi-language'
  },
  {
    label: 'Speech',
    icon: 'pi pi-volume-up',
    items: [
      {
        label: 'Start',
        icon: 'pi pi-caret-right'
      },
      {
        label: 'Stop',
        icon: 'pi pi-pause'
      }
    ]
  },
  {
    separator: true
  },
  {
    label: 'Print',
    icon: 'pi pi-print'
  }];

const items4 = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      console.log("test2")
    }
  },
  {
    label: 'Features',
    icon: 'pi pi-star'
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt'
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server'
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil'
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette'
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette'
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope'
  },{
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      console.log("test2")
    }
  },
  {
    label: 'Features',
    icon: 'pi pi-star'
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt'
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server'
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil'
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette'
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette'
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope'
  }
];

function App() {

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  const { themeState, setTheme } = useContext(ThemeContext);

  const [items44] = useState([{ ...items4[0], command: () => setTheme('mira') }, ...items4.slice(1, items4.length)]);

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    NodeService.getTreeNodes().then((data) => setNodes(data));
  }, []);

  return (
    <div>
      {/* <Menubar model={items44} pt={{button: {className: "hidden"}, menu:{className: "flex flex-row flex-nowrap"}, menuitem:{ className:""}}}/> */}
      {/* <Menubar model={items44} pt={{button: {className: "hidden"}, menu:{className: "flex"}, menuitem:{ className:""}}}/> */}
      {/* <Menubar model={items44} className="inline-block" pt={{button: {className: "hidden"}, menu:{className: ""}, menuitem:{ className:"inline"}}}/> */}
      {/* <Menubar model={items44} pt={{button: {className: "hidden"}, menu:{className: "flex flex-row flex-nowrap"}, menuitem:{ className:""}}}/> */}
      
      {/* <div className="overflow-x-hidden"> */}
        <Menubar
          // className="block overflow-x-hidden"
          model={items44}
          // pt={{
          //   button: {className: "hidden"}, 
          //   menu:{className: "block"}, 
          //   menuitem:{ className:"inline-block static"}
          // }}
        />
      {/* </div> */}

      {/* <TabMenu model={items} /> */}
      {/* <BreadCrumb model={items2} home={home} /> */}
      {/* <ContextMenu global model={items3} breakpoint="767px" /> */}
      {/* <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warning" severity="warning" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" /> */}
      {/* <TabView>
        <TabPanel header="Header I">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </TabPanel>
        <TabPanel header="Header II">
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="Header III">
          <p className="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
            quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabView> */}

      {/* <Toolbar /> */}
      
      
      
      {/* <Splitter>
        <SplitterPanel className="overflow-x-hidden block" minSize={10} size={20}>
          <Tree value={nodes} selectionMode="single" className="w-full overflow-x-hidden" />
        </SplitterPanel>
        <SplitterPanel minSize={50} size={80}>

          <Splitter>
            <SplitterPanel className="block" size={75}><Gridcontent /></SplitterPanel>
            <SplitterPanel className="block" minSize={12.5} size={25}>
              <Accordion multiple activeIndex={[0]}>
                <AccordionTab header="Header I" pt={{
                  headerTitle: {
                    className: "white-space-nowrap",
                  }
                }}>
                  <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </AccordionTab>
                <AccordionTab header="Header II" pt={{
                  headerTitle: {
                    className: "white-space-nowrap",
                  }
                }}>
                  <p className="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    Consectetur, adipisci velit, sed quia non numquam eius modi.
                  </p>
                </AccordionTab>
                <AccordionTab header="Header III" pt={{
                  headerTitle: {
                    className: "white-space-nowrap",
                  }
                }}>
                  <p className="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                    quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                    mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                  </p>
                </AccordionTab>
              </Accordion>
            </SplitterPanel>
          </Splitter>



        </SplitterPanel>

      </Splitter> */}
    </div>
  );
}

export default App;
