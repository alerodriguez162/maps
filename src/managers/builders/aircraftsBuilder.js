import { buildTextMarker } from './utils/marker'
import { baseAircraftsName } from '../../static/baseObjects'
import { baseAircraft } from '../../static/baseObjects'

export const buildAircraft = (flight, flightLineId, position, shouldAnimate, config) => {
  const color = flight.color || config.colors.aircrafts
  return Object.assign(
    {
      id: `state${flight.state}-${flight.name}-${color.replace('#', '')}`,
      title: `${baseAircraftsName}${flight.name}`,
      lineId: flightLineId,
      color: color,
      selectedColor: color,
      rollOverColor: color,
      positionOnLine: position,
      animateAlongLine: shouldAnimate,
      flipDirection: config.animation.flip,
      loop: config.animation.loop,
      mouseEnabled: !flight.hideGlowingEffect, 
      selectable: !flight.hideGlowingEffect,
      balloonText: buildTextMarker(flight, config.dataToShowOnMarkers)
    },
    baseAircraft
  )
}
