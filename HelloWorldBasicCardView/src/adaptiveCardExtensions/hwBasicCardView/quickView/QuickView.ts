import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HwBasicCardViewAdaptiveCardExtensionStrings';
import { IHwBasicCardViewAdaptiveCardExtensionProps, IHwBasicCardViewAdaptiveCardExtensionState } from '../HwBasicCardViewAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  description: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IHwBasicCardViewAdaptiveCardExtensionProps,
  IHwBasicCardViewAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      description: this.properties.description
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}