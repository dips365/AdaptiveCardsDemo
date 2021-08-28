import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HwImageCardViewAdaptiveCardExtensionStrings';
import { IHwImageCardViewAdaptiveCardExtensionProps, IHwImageCardViewAdaptiveCardExtensionState } from '../HwImageCardViewAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IHwImageCardViewAdaptiveCardExtensionProps, IHwImageCardViewAdaptiveCardExtensionState> {
  public get data(): IImageCardParameters {
    return {
      primaryText: strings.PrimaryText,
      imageUrl: 'https://blogs.microsoft.com/uploads/2017/09/WR-Microsoft-logo.jpg'
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
