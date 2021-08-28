import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { PrimaeyTextViewPropertyPane } from './PrimaeyTextViewPropertyPane';

export interface IPrimaeyTextViewAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IPrimaeyTextViewAdaptiveCardExtensionState {
  description: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'PrimaeyTextView_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'PrimaeyTextView_QUICK_VIEW';

export default class PrimaeyTextViewAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IPrimaeyTextViewAdaptiveCardExtensionProps,
  IPrimaeyTextViewAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: PrimaeyTextViewPropertyPane | undefined;

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
      /* webpackChunkName: 'PrimaeyTextView-property-pane'*/
      './PrimaeyTextViewPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.PrimaeyTextViewPropertyPane();
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
