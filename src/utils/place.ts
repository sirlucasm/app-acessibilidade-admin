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

export const PlaceDetails = [
  {
    label: 'Banheiro',
    value: 'Banheiro'
  },
  {
    label: 'Estacionamento',
    value: 'Estacionamento'
  },
  {
    label: 'Rampas',
    value: 'Rampas'
  },
  {
    label: 'Piso tátil',
    value: 'Piso tátil'
  },
  {
    label: 'Calçada',
    value: 'Calçada'
  },
  {
    label: 'Faixa de pedestre',
    value: 'Faixa de pedestre'
  },
  {
    label: 'Mesas',
    value: 'Mesas'
  },
  {
    label: 'Arborizada',
    value: 'Arborizada'
  },
  {
    label: 'Espaço KIDS',
    value: 'Espaço KIDS'
  },
  {
    label: 'Food truck',
    value: 'Food truck'
  },
  {
    label: 'Bancos',
    value: 'Bancos'
  },
]
