<script>
  import loader from '@beyonk/async-script-loader'
  import { onMount, createEventDispatcher } from 'svelte'
  import { mapsLoaded, mapsLoading } from './stores.js'

  const dispatch = createEventDispatcher()

  export let apiKey
  
  $: $mapsLoaded && dispatch('ready')

  onMount(() => {
    window.byGmapsReady = () => {
      mapsLoaded.set(true)
      delete window.byGmapsReady
    }

    if ($mapsLoaded) {
      dispatch('ready')
    }

    if (!$mapsLoading) {
      const url = new URL('/maps/api/js', 'https://maps.googleapis.com')
      url.searchParams.set('libraries', 'places')
      url.searchParams.set('callback', 'byGmapsReady')
      url.searchParams.set('loading', 'async')
      apiKey && url.searchParams.set('key', apiKey)

      mapsLoading.set(true)

      loader(
        [
          { type: 'script', url: url.toString() }
        ],
        () => { return $mapsLoaded },
        () => {}
      )
    }
  })
</script>
