import { h } from "vue"
import MainView from "../components/views/MainView.vue"
import Actions from "../components/views/Actions.vue"

const NotFoundComponent = { template: '<p>Page not found</p>' }

const routes = {
  '/': MainView,
  '/actions': Actions
}

export const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },

  render() {
    return h(this.CurrentComponent)
  }
}
