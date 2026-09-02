import { createApp } from 'vue'
import App from './App.vue'

// Import global stylesheet
import './styles/global.css'

// TODO: Import HeaderComponent and FooterComponent
// DONE
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const app = createApp(App)

// TODO: Register HeaderComponent and FooterComponent globally using app.component()
// DONE
app.component('HeaderComponent', HeaderComponent)
app.component('FooterComponent', FooterComponent)

// TODO: Mount the application to the target '#app' container defined in index.html
// DONE
app.mount('#app')
