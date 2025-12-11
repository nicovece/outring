<?php

namespace modules\cpdarkmode\assetbundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * Asset bundle for Control Panel Dark Mode
 * 
 * Loads the dark mode stylesheet after Craft's default CP styles.
 */
class CpDarkModeAsset extends AssetBundle
{
  /**
   * Initializes the asset bundle.
   */
  public function init(): void
  {
    // Path to the folder containing the CSS file
    // Use __DIR__ to get the directory of this file, then go to dist/
    $this->sourcePath = __DIR__ . '/dist';

    // Ensure our CSS loads after Craft's CP styles
    $this->depends = [
      CpAsset::class,
    ];

    // CSS files to include
    $this->css = [
      'cpdarkmode.css',
    ];

    parent::init();
  }
}
