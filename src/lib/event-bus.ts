import mitt from "mitt";
import { App } from "vue";

export const EventBus = mitt();

export default function useBus(app: App): void {
  app.config.globalProperties.$bus = EventBus;
}
