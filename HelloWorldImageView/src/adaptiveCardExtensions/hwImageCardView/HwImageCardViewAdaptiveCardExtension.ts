import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { HwImageCardViewPropertyPane } from './HwImageCardViewPropertyPane';

export interface IHwImageCardViewAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IHwImageCardViewAdaptiveCardExtensionState {
  description: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'HwImageCardView_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'HwImageCardView_QUICK_VIEW';

export default class HwImageCardViewAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IHwImageCardViewAdaptiveCardExtensionProps,
  IHwImageCardViewAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: HwImageCardViewPropertyPane | undefined;

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
      /* webpackChunkName: 'HwImageCardView-property-pane'*/
      './HwImageCardViewPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.HwImageCardViewPropertyPane();
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
