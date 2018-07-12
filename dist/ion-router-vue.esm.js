import VueRouter from 'vue-router';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    name: 'IonRouterVue',
    data: function data() {
        return {
            leavingEl: null,
            enteringEl: null,
        }
    },
    props: {
        bindCss: {
            type: Boolean,
            default: false,
        },
        animated: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        catchIonicGoBack: function catchIonicGoBack(event) {
            if (!event.target) {
                return
            }

            var backButton = event.target.closest('ion-back-button');

            if (!backButton) {
                return
            }

            var defaultHref;

            if (this.$router.canGoBack()) {
                event.preventDefault();
                this.$router.back();
            } else if (undefined !== (defaultHref = backButton.defaultHref)) {
                event.preventDefault();
                this.$router.push(defaultHref);
            }
        },
        transition: function transition(enteringEl, leavingEl, done) {
            var this$1 = this;

            var ionRouterOutlet = this.$refs.ionRouterOutlet;

            if (!enteringEl || enteringEl === leavingEl) {
                return
            }

            enteringEl.classList.add('ion-page', 'hide-page');

            ionRouterOutlet.componentOnReady().then(function (el) {
                el.commit(enteringEl, leavingEl, {
                    duration: !this$1.animated ? 0 : undefined,
                    direction: this$1.$router.direction === 1 ? 'forward' : 'back',
                    deepWait: true,
                    showGoBack: this$1.$router.canGoBack(),
                }).then(function () { return done(); });
            }).catch(function (err) { return console.error(err); });
        },
        beforeEnter: function beforeEnter(element) {
            this.enteringEl = element;
        },
        beforeLeave: function beforeLeave(element) {
            this.leavingEl = element;
        },
        leave: function leave(element, done) {
            this.transition(this.enteringEl, element, done);
        },
        enter: function enter(element, done) {
            done();
        },
        afterEnter: function afterEnter(el) {},
        enterCancelled: function enterCancelled(el) {},
        afterLeave: function afterLeave(el) {},
        leaveCancelled: function leaveCancelled(el) {},
    },
};

/* script */
            var __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ion-router-outlet",
    { ref: "ionRouterOutlet", on: { click: _vm.catchIonicGoBack } },
    [
      _c(
        "transition",
        {
          attrs: { mode: "in-out", css: _vm.bindCss },
          on: {
            "before-enter": _vm.beforeEnter,
            enter: _vm.enter,
            "after-enter": _vm.afterEnter,
            "enter-cancelled": _vm.enterCancelled,
            "before-leave": _vm.beforeLeave,
            leave: _vm.leave,
            "after-leave": _vm.afterLeave,
            "leave-cancelled": _vm.leaveCancelled
          }
        },
        [_c("router-view")],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    {
      component.__file = "/data/source/ion-router-vue/src/IonRouterVue.vue";
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var IonRouterVue = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

var Router = (function (VueRouter$$1) {
    function Router() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        VueRouter$$1.apply(this, args);
        this.direction = args.direction || 1;
        this.viewCount = args.viewCount || 0;
        this.prevRoute = this.history.current;
        this.extendHistory();
    }

    if ( VueRouter$$1 ) Router.__proto__ = VueRouter$$1;
    Router.prototype = Object.create( VueRouter$$1 && VueRouter$$1.prototype );
    Router.prototype.constructor = Router;
    Router.prototype.extendHistory = function extendHistory () {
        var this$1 = this;

        this.history._updateRoute = this.history.updateRoute;
        this.history.updateRoute = function (route) {
            this$1.direction = this$1.guessDirection(route);
            this$1.viewCount += this$1.direction;
            this$1.history._updateRoute(route);
        };
    };
    Router.prototype.push = function push () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        VueRouter$$1.prototype.push.apply(this, args);
        this.direction = 1;
        this.viewCount++;
    };
    Router.prototype.go = function go (n) {
        VueRouter$$1.prototype.go.call(this, n);
        this.viewCount += n;
        this.direction = n > 0 ? 1 : -1;
    };
    Router.prototype.canGoBack = function canGoBack () {
        return this.viewCount > 0 && this.currentRoute.path.length > 1
    };
    Router.prototype.guessDirection = function guessDirection (route) {
        if (this.prevRoute.fullPath === route.fullPath) {
            return -1
        }
        this.prevRoute = this.history.current;
        return 1
    };

    return Router;
}(VueRouter));

Router.install = function (Vue) {
    if (Router.install.installed) { return }
    Router.install.installed = true;
    VueRouter.install(Vue);
    Vue.component('IonRouterVue', IonRouterVue);
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var globalVue = null;
if (typeof window !== 'undefined') {
    globalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    globalVue = global.Vue;
}
if (globalVue) {
    globalVue.use(Router);
}

export default Router;
//# sourceMappingURL=ion-router-vue.esm.js.map
