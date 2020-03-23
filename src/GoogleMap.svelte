<GoogleSdk {apiKey} on:ready={initialise} />
<div class="map" bind:this={mapElement}>
  {#if map}
    <slot></slot>
  {/if}
</div>

<style>
  .map {
    height: 100%;
    width: 100%;
  }
</style>

<script>
  import GoogleSdk from './GoogleSdk.svelte'
  import { createEventDispatcher, setContext } from 'svelte'
  import { key } from "./contexts"

  setContext(contextKey, {
    getMap: () => map,
    getGoogleMap: () => mapElement
	})

  const dispatch = createEventDispatcher()

  export let apiKey

  let mapElement
  let map
  
  export let center = null
  export let zoom = 8
  export let options = {}

  export function getDomBounds () {
    return mapElement.getBoundingClientRect()
  }

  export function getDefaultView () {
    return mapElement.ownerDocument.defaultView
  }

  export function setHeight (height) {
    mapElement.style.height = height
  }

  export function setMaxHeight (height) {
    mapElement.style.maxHeight = height
  }

  export function setCentre (location) {
    map.setCenter(location)
  }

  function initialise () {
    setTimeout(() => {
      const google = window['google']
      map = new google.maps.Map(mapElement, Object.assign(
        {
          center,
          zoom
        },
        options
      ))

      google.maps.event.addListener(map, 'dragend', () => {
        const location = map.getCenter()
        center = location
        dispatch('recentre', { location })
      })

      dispatch('ready')
    }, 1)
  }
</script>
