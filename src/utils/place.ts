import { ALERT, SUCCESS, WARNING } from "../styles/colors";

type Accessible = 'yes' | 'parcial' | 'no'

const color = {
  yes: SUCCESS,
  parcial: WARNING,
  no: ALERT
}

const types = {
  yes: 'Acessível',
  parcial: 'Parcialmente acessível',
  no: 'Não acessível'
}

export const PlacesTranslated = [
  {
    label: 'Acessível',
    value: 'yes'
  },
  {
    label: 'Parcialmente acessível',
    value: 'parcial'
  },
  {
    label: 'Não acessível',
    value: 'no'
  },
]

export const accessibleTranslateToString = (accessible: Accessible) => types[accessible];

export const generateAccessibleObj = (accessible: Accessible) => ({
  text: accessibleTranslateToString(accessible),
  color: color[accessible]
});

export const accessibleColorString = (accessible: Accessible) => color[accessible];
