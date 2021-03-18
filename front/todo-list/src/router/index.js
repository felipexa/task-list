import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '@/views/todo-list/TodoList.vue';
import Author from '@/views/author/Author.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TodoList,
    },
    {
        path: '/author',
        name: 'Author',
        component:  Author,
    }
]

const router = new VueRouter({
    routes
})

export default router
