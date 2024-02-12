<template>
  <MapArea>
    <KakaoMap
      :center="{ lat: 34.7458867, lng: 127.751222 }"
      style="width: 100%; height: 100%"
    >
      <Marker :position="{ lat: 34.7458867, lng: 127.751222 }"> </Marker>
      <ZoomControl position="RIGHT" />
    </KakaoMap>
  </MapArea>
</template>
<script setup>
import { KakaoMap, ZoomControl, useKakaoLoader, Marker } from 'vue-kakao-maps';
import { styled } from 'emotion-vuejs';

const MapArea = styled('div')({
  width: '100%',
  height: '320px',
  backgroundColor: '#999',
  overflow: 'hidden',
});

useKakaoLoader({ appKey: '0db128344389f86d307476e6f860fa86' });
</script>
