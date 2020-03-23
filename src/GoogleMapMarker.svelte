<script>
  import { getContext } from 'svelte';
  import { key } from './contexts.js';

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lng;

  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map
  });
</script>
