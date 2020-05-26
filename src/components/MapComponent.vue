<template>
    <div class="MapComponent"/>
</template>

<script>
import gmapsInit from '../utils/gmaps';

// TODO: fix this component using VUEX
export default {
    name: 'MapComponent',
    props: ['mainLocation', 'selectedLocationId', 'secondaryLocations', 'shouldReprocessSecondaryLocations'],
    computed: {
        center: function() {
            return this.mainLocation ? this.mainLocation : {lat:0, lng:0};
        },
    },
    watch: {
        mainLocation: function(value) {
            console.log(`main location changed = ${JSON.stringify(value)}`);
            if (this.google && this.map && value) {
                console.log('creating main location marker');
                new this.google.maps.Marker({position: value, map: this.map, label: 'You'});
            }
            this.fitMap();
        },
        selectedLocationId: function (value, oldValue) {
            console.log(`selected location id changed = ${JSON.stringify(value)}`);
            if (this.google && this.map && value) {
                if (oldValue) {
                    console.log('unselecting previous selected marker');
                    const marker = this.markers.get(oldValue);
                    if (marker) {
                        marker.setLabel('');
                        marker.setOpacity(0.5);
                    }
                }

                this.renderSelectedMarker();
            }
        },
        // TODO: I suspect this could be implemented using VUEX without need for this flag.
        shouldReprocessSecondaryLocations : function(value) {
            console.log(`settingSecondaryLocations to ${JSON.stringify(value)} ${typeof value}`);

            if (this.google && this.map) {
                console.log('calling secondary markers render');
                this.renderSecondaryMarkers();
                this.renderSelectedMarker();
            }
        },
    },
    data() {
        return {
            map: null,
            google: null,
            markers: new Map(),
            mainMarker: null,
        };
    },
    async mounted() {
        console.log('mounted()');
        try {
            this.google = await gmapsInit();

            this.map = new this.google.maps.Map(this.$el, {
                center: this.center,
                zoom: 12,
            });

            if (this.mainLocation) {
                console.log(`main location exists ${JSON.stringify(this.mainLocation)}`);
                if (this.mainMarker) {
                    console.log(`main marker exists ${JSON.stringify(this.mainMarker)}`);
                    this.mainMarker.setPosition(this.mainLocation);
                } else {
                    console.log('creating main marker');
                    this.mainMarker = new this.google.maps.Marker({position: this.mainLocation, map: this.map, label: 'You'});
                }
            }

            if (this.selectedLocationId) {
                console.log(`selected location exists ${JSON.stringify(this.selectedLocationId)}`);
            }

            this.renderSecondaryMarkers();
            this.renderSelectedMarker();

        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        renderSecondaryMarkers() {
            console.log('renderSecondaryMarkers()');
            console.log(`secondaryLocations = ${JSON.stringify(this.secondaryLocations)}`);
            if (this.secondaryLocations) {
                console.log('creating secondary markers');
                this.markers = new Map();
                this.secondaryLocations.forEach((value, key) => {
                    console.log(`creating marker ${key}`);
                    const marker = new this.google.maps.Marker({position: value, map: this.map, opacity: 0.5});
                    this.markers.set(key, marker);
                });
            }
        },
        renderSelectedMarker() {
            console.log('renderSelectedMarker()');
            console.log(`selectedLocationId = ${this.selectedLocationId}`);
            if (this.selectedLocationId) {
                console.log('selecting new marker');
                const selectedMarker = this.markers.get(this.selectedLocationId);
                if (selectedMarker) {
                    console.log('modifying selected marker');
                    selectedMarker.setLabel('Selected');
                    selectedMarker.setOpacity(1);
                }
            }
            this.fitMap();
        },
        fitMap() {
            console.log('fitMap()');
            if (this.google && this.secondaryLocations) {
                const selectedLocation = this.secondaryLocations.get(this.selectedLocationId);
                console.log(`getting selected location to fit map = ${JSON.stringify(selectedLocation)}`);
                if (this.mainLocation && selectedLocation) {
                    console.log('actually fitting map');
                    const bounds = new this.google.maps.LatLngBounds()
                        .extend(this.mainLocation)
                        .extend(selectedLocation);

                    this.map.fitBounds(bounds);
                }
            }
        }
    }
};
</script>

<style>
    .MapComponent {
        width: 100%;
        height: 100%;
    }
</style>
