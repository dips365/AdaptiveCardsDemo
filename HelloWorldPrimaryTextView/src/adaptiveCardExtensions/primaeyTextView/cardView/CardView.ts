import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'PrimaeyTextViewAdaptiveCardExtensionStrings';
import { IPrimaeyTextViewAdaptiveCardExtensionProps, IPrimaeyTextViewAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../PrimaeyTextViewAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IPrimaeyTextViewAdaptiveCardExtensionProps, IPrimaeyTextViewAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: strings.PrimaryText,
      description: this.properties.description
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
