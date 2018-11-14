import { shouldSetFlightInProgress, getFlightPosition, getPositionOnLine } from '../flightsManager'
import { buildLine } from './linesBuilder'
import { buildAirportsObjects } from './airportsBuilder'
import { buildAircraft } from './aircraftsBuilder'
import { cleanPoints } from './utils/arrayManager'

const buildObjectWithNoRoute = (flight, flightLineId, aircraftName, config, position, shouldAnimate) => {
  const lines = [buildLine(flightLineId, flight, config, null, null)]
  const positionOnLine = flight.actualPosition ? getPositionOnLine(flight.origin, flight.destination, flight.actualPosition) : position
  const images = [buildAircraft(flight, aircraftName, flightLineId, positionOnLine, shouldAnimate, config)]
  return { images, lines }
}

const buildObjectWithRoute = (flight, aircraftName, config, shouldAnimate) => {
  const images = []
  const lines = []
  const cleanedPoints = cleanPoints(flight.route)
  const points = cleanedPoints
  for (let i = 0; i < points.length - 1; i++) {
    const flightRouteLineId = 'flight-route' + i
    lines.push(buildLine(flightRouteLineId, flight, config, points[i], points[i + 1]))
  }
  const flightRouteLineId = 'flight-route-final'
  if (flight.actualPosition) lines.push(buildLine(flightRouteLineId, flight, config, flight.actualPosition, flight.destination, true))
  else lines.push(buildLine(flightRouteLineId, flight, config, points[points.length - 1], flight.destination, true))
  images.push(buildAircraft(flight, aircraftName, flightRouteLineId, 0, shouldAnimate, config))
  return { images, lines }
}

export const buildObjectsForFlight = (flight, index, config) => {
  const aircraftName = 'plane' + index
  const flightLineId = 'flight' + index
  const position = getFlightPosition(flight.state)
  const shouldAnimate = shouldSetFlightInProgress(config.globalFlightsState, config.animation.enabled, flight.state)
  const flightObjects = flight.route
    ? buildObjectWithRoute(flight, aircraftName, config, shouldAnimate)
    : buildObjectWithNoRoute(flight, flightLineId, aircraftName, config, position, shouldAnimate)
  const images = [...flightObjects.images, ...buildAirportsObjects(flight, position, shouldAnimate, config)]
  const lines = [...flightObjects.lines]
  return { images, lines }
}