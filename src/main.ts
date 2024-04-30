import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue, {usePrimeVue} from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App)
app.use(PrimeVue);
app.use(ConfirmationService)
app.mount('#app');


const pmv = usePrimeVue();
pmv.changeTheme('lara-dark-blue','md-dark-deeppurple','theme-link',() => {})
