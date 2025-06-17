<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import type { Loction } from '@@/models/location'

const emit = defineEmits(['location-selected']);

interface Props {
  initialLocation?: Loction | null;
}
const props = defineProps<Props>();

const map = ref<any>(null);
const markerPosition = ref<[number, number] | null>(null);

const initialCenter = ref<[number, number]>([30.0444, 31.2357]);

const handleMapClick = (event: any) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;
  markerPosition.value = [lat, lng];
  emit('location-selected', { lat, lng });
};

onMounted(() => {
  if (props.initialLocation) {
    initialCenter.value = [props.initialLocation.lat, props.initialLocation.lng];
    markerPosition.value = [props.initialLocation.lat, props.initialLocation.lng];
    if (map.value?.leafletObject) {
      map.value.leafletObject.setView(initialCenter.value, 13);
    }
  }
});

watch(() => props.initialLocation, (newLocation) => {
  if (newLocation && map.value?.leafletObject) {
    initialCenter.value = [newLocation.lat, newLocation.lng];
    markerPosition.value = [newLocation.lat, newLocation.lng];
    map.value.leafletObject.setView(initialCenter.value, 13);
  }
}, { deep: true });
</script>
<template>
  <div class="">
    <LMap
      style="width: 100%; height: 200px;"
      :zoom="13"
      :center="initialCenter"
      @click="handleMapClick"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker v-if="markerPosition" :lat-lng="markerPosition" />
    </LMap>
  </div>
</template>


<style scoped>
</style>