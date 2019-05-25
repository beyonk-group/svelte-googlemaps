<script>
  import loader from '@beyonk/async-script-loader'

  export default {
    props: ['apiKey'],

    async oncreate () {
      const component = this
      window.byGmapsReady = function () {
        component.root.set({ byMapsSdkLoaded: true })
        component.fire('ready')
        delete window['byGmapsReady']
      }

      const { version, apiKey, libraries } = this.get()
      const { byMapsSdkLoaded, byMapsSdkLoading } = this.root.get()

      if (byMapsSdkLoaded) {
        return this.fire('ready')
      }

      if (!byMapsSdkLoading) {
        const url = [
          '//maps.googleapis.com/maps/api/js?',
          apiKey ? `key=${apiKey}&` : '',
          `libraries=places&callback=byGmapsReady`
        ].join('')

        this.root.set({ byMapsSdkLoading: true })
        loader(
          url,
          () => {
            const { byMapsSdkLoaded } = this.root.get()
            return !!byMapsSdkLoaded
          },
          () => {
            this.fire('ready')
          }
        )
      }
    }
  }
</script>