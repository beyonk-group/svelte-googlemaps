<GoogleSdk {apiKey} on:ready={initialise} />
<input {id} aria-label={ariaLabel} class={styleClass} {placeholder} bind:this={search} type="text" {disabled} bind:value={viewValue} on:blur={blur} on:keydown={autocompleteKeydown} on:input={input} />

<script>
  import GoogleSdk from './GoogleSdk.svelte'
  import { createEventDispatcher } from 'svelte'

  export let id = `gm-autocomplete-${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}`
  export let apiKey = null
  export let ariaLabel = 'location'
  export let placeholder = 'Location'
  export let styleClass = ''
  export let value = null
  export let viewValue = null
  export let viewLabel = 'formatted_address'
  export let fields = [ 'geometry', viewLabel ]
  export let types = [ '(regions)' ]
  export let options = {}

  let search
  let autocomplete
  let valid
  let disabled = true

  const dispatch = createEventDispatcher()

  export function clear () {
    value = null
    viewValue = null
    valid = true

    dispatch('clear')
  }

  function dropdownVisible () {
    return document.querySelectorAll('.pac-container')[0].offsetParent !== null
  }

  function autocompleteKeydown (e) {
    if (e.keyCode === 13 && dropdownVisible()) {
      e.preventDefault()
    }
  }

  function input () {
    valid = false
  }

  function blur () {
    dispatch('blur')
    if (!valid) {
      clear()
    }
  }

  function initialise () {
    const google = window.google
    autocomplete = new google.maps.places.Autocomplete(
      search,
      Object.assign(
        {
          fields,
          types
        },
        options
      )
    )

    // Assume initial value is valid
    valid = true
    disabled = false

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (place.geometry) {
        valid = true
        viewValue = place[viewLabel]
        value = viewValue
        dispatch('placeChanged', { place, selectedPrediction: search.value })
      } else {
        valid = false
      }
    })

    dispatch('ready')
  }
</script>
