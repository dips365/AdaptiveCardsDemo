import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { HwBasicCardViewPropertyPane } from './HwBasicCardViewPropertyPane';

export interface IHwBasicCardViewAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IHwBasicCardViewAdaptiveCardExtensionState {
  description: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'HwBasicCardView_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'HwBasicCardView_QUICK_VIEW';

export default class HwBasicCardViewAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IHwBasicCardViewAdaptiveCardExtensionProps,
  IHwBasicCardViewAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: HwBasicCardViewPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      description: this.properties.description
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'HwBasicCardView-property-pane'*/
      './HwBasicCardViewPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.HwBasicCardViewPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
