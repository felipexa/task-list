import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrashAlt);
library.add(faEdit);
library.add(faCheckSquare);
library.add(faPlay);
library.add(faTasks);
library.add(faUserNinja);
library.add(faLink);
library.add(faPlusSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;