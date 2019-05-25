<script>
  import loader from '@beyonk/async-script-loader'

  export default {
    props: ['apiKey'],

    methods: {
      init () {
        this.fire('ready')
      }
    },

    async oncreate () {
      const component = this
      window.byGmapsReady = function () {
        component.root.set({ byMapsSdkLoaded: true })
        component.init()
        delete window['byGmapsReady']
      }

      const { version, apiKey, libraries } = this.get()

      const url = [
        '//maps.googleapis.com/maps/api/js?',
        apiKey ? `key=${apiKey}&` : '',
        `libraries=places&callback=byGmapsReady`
      ].join('')

      const { byMapsSdkLoading } = this.root.get()
      if (!byMapsSdkLoading) {
        this.root.set({ byMapsSdkLoading: true })
        loader(
          url,
          () => {
            const { byMapsSdkLoaded } = this.root.get()
            return !!byMapsSdkLoaded
          },
          () => {
            this.init()
          }
        )
      }
    }
  }
</script>