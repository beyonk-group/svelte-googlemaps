<script>
  import { getContext } from 'svelte'
  import { key } from './contexts.js'

  const { getMap } = getContext(key)
  const map = getMap()

  export let lat
  export let lng

  // eslint-disable-next-line no-new
  new window.google.maps.Marker({
    position: { lat, lng },
    map
  })
</script>
