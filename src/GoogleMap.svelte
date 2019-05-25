<GoogleSdk {apiKey} on:ready="initialise()" />
<div class="map" ref:map></div>

<style>
  .map {
    height: 100%;
    width: 100%;
  }
</style>

<script>
  export default {
    props: ['apiKey'],

    data () {
      return {
        map: undefined,
        apiKey: undefined,
        placeholder: 'Location',
        styleClass: '',
        value: undefined,
        styles: [],
        center: undefined,
        options: {}
      }
    },

    components: {
      GoogleSdk: './GoogleSdk.svelte'
    },

    methods: {
      getDomBounds () {
        const { map } = this.refs
        return map.getBoundingClientRect()
      },

      getDefaultView () {
        const { map } = this.refs
        return map.ownerDocument.defaultView
      },

      setHeight (height) {
        const { map } = this.refs
        map.style.height = height
      },

      setMaxHeight (height) {
        const { map } = this.refs
        map.style.maxHeight = height
      },

      setCentre (location) {
        this
          .getInternalMap()
          .setCenter(location)
      },

      getInternalMap() {
        const { map } = this.get()
        return map
      },

      initialise () {
        function slowRenderDown () {
          const { options } = this.get()

          const google = window['google']
          const map = new google.maps.Map(this.refs.map, options)

          this.set({ map })

          google.maps.event.addListener(map, 'dragend', function () {
            const location = map.getCenter()
            this.set({ center: location })
            this.fire('recentre', { location })
          }.bind(this))

          this.fire('ready')
        }

        setTimeout(slowRenderDown.bind(this), 1)
      }
    }
  }
</script>
