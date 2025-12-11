<?php

namespace modules\cpdarkmode;

use Craft;
use yii\base\Module;
use modules\cpdarkmode\assetbundles\CpDarkModeAsset;

/**
 * Control Panel Dark Mode module
 * 
 * Injects a dark theme stylesheet into the Craft CMS Control Panel.
 */
class CpDarkMode extends Module
{
  /**
   * Initializes the module.
   */
  public function init(): void
  {
    // Set the controllerNamespace if you ever add controllers
    $this->controllerNamespace = 'modules\\cpdarkmode\\controllers';

    parent::init();

    // Only load in the CP, and not during console requests
    $request = Craft::$app->getRequest();

    if ($request->getIsCpRequest() && !$request->getIsConsoleRequest()) {
      $this->_registerAssetBundle();
    }
  }

  /**
   * Registers the dark mode CSS asset bundle.
   */
  private function _registerAssetBundle(): void
  {
    Craft::$app->getView()->registerAssetBundle(CpDarkModeAsset::class);
  }
}
