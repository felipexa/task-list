import Vue from 'vue';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';
import InputText from 'primevue/inputtext';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressSpinner from 'primevue/progressspinner';

Vue.component('Dropdown', Dropdown);
Vue.component('Dialog', Dialog);
Vue.component('Sidebar', Sidebar);
Vue.component('InputText', InputText);
Vue.component('Panel', Panel);
Vue.component('Button', Button);
Vue.component('Toast', Toast);
Vue.component('ProgressSpinner', ProgressSpinner);

Vue.use(ToastService);
