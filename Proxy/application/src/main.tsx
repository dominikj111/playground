import App from './App.tsx'
import GenericEntryRenderer from "any3-ui-components/src/Base/Components/GenericEntryRenderer"
import metas from "../webstrings/metas.json";
import "any3-ui-components/src/common.scss"
import './index.css'

  GenericEntryRenderer(App, {}, []).start(document.getElementById('react-app')!, {
    translations: {
      
    }, filter: metas.filter, initials: {}
  });

