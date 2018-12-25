<?php

chdir(dirname(__FILE__));

    define('ROOT_DIR', dirname(dirname(__FILE__) . "../"));
    define('TEMPLATE_DIR', ROOT_DIR . '/template');
    echo __FILE__;
    echo ROOT_DIR;
    echo TEMPLATE_DIR;