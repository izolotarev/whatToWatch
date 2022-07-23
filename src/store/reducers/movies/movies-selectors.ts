import { State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getSelectedGenre = (state: State): string => state[NameSpace.movies].selectedGenre;
