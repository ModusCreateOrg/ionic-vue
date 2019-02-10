import { CreateElement, RenderContext, VNode } from 'vue';

export default {
  name: 'IonTabs2',
  functional: true,
  render(h: CreateElement, { parent, data, slots }: RenderContext) {
    // Get cached ion-tabs
    const cachedTabs = parent.$ionic.cachedTabs as VNode[];

    // Children to render
    const renderQueue = [];

    // Loop through all of the components children
    for (let i = 0; i < slots().default.length; i++) {
      const c = slots().default[i];

      // Not an ion-tab, no further processing required
      if (c.tag!.match(/ion-tab$/) === null) {
        renderQueue.push(c);
        continue;
      }

      // Render, cache or ignore ion-tabs
      const tabMatchesRoute = parent.$route.path.indexOf((c.componentOptions!.propsData as any).tab) > -1;
      const tabIsCached = cachedTabs[i];

      // Landed on tab route
      // Cache the tab, push to render queue and continue iteration
      if (tabMatchesRoute) {
        if (!tabIsCached) {
          cachedTabs[i] = c;
        }

        c.data!.attrs!.class = 'ion-page';
        renderQueue.push(c);
        continue;
      }

      // Tab was previously cached, push to render queue but hide it for future display
      if (tabIsCached) {
        c.data!.attrs!.class = 'ion-page-hidden';
        renderQueue.push(c);
      }
    }

    // Update global cached tabs
    parent.$ionic.cachedTabs = cachedTabs;

    // Render
    return h('div', { ...data, style: hostStyles }, [
      slots().top,
      h('div', { class: 'tabs-inner', style: tabsInner }, renderQueue),
      slots().bottom,
    ]);
  }
};

const hostStyles = {
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'column',
  width: '100%',
  height: '100%',
};

const tabsInner = {
  position: 'relative',
  flex: 1,
};
