<?php // $Id: $
/*
==============================================================================
	Dokeos - elearning and course management software

	Copyright (c) 2008 Dokeos Latinoamerica SAC
	Copyright (c) 2006 Dokeos SPRL
	Copyright (c) 2006 Ghent University (UGent)
	Copyright (c) various contributors
	Copyright (c) Isaac Flores Paz <florespaz@bidsoftperu.com>
	For a full list of contributors, see "credits.txt".
	The full license can be read in "license.txt".

	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU General Public License
	as published by the Free Software Foundation; either version 2
	of the License, or (at your option) any later version.

	See the GNU General Public License for more details.

	Contact address: Dokeos, rue du Corbeau, 108, B-1030 Brussels, Belgium
	Mail: info@dokeos.com
==============================================================================
*/
$language_file = 'gradebook';
//$cidReset = true;
require_once ('../inc/global.inc.php');
require_once ('lib/be.inc.php');
require_once ('lib/gradebook_functions.inc.php');
require_once ('lib/fe/evalform.class.php');
api_block_anonymous_users();
block_students();

$interbreadcrumb[] = array (
	'url' => $_SESSION['gradebook_dest'].'?',
	'name' => get_lang('Gradebook'
));
$interbreadcrumb[] = array (
	'url' => $_SESSION['gradebook_dest'].'?selectcat='.Security::remove_XSS($_GET['selectcat']),
	'name' => get_lang('Details'
));
$interbreadcrumb[] = array (
	'url' => 'gradebook_showlog_eval.php?visiblelog='.Security::remove_XSS($_GET['visiblelog']).'&amp;selectcat='.Security::remove_XSS($_GET['selectcat']),
	'name' => get_lang('GradebookQualifyLog')
);

Display :: display_header('');
echo '<div class="clear"></div>';
echo '<div class="actions">';
api_display_tool_title(get_lang('GradebookQualifyLog'));
echo '</div>';


$t_linkeval_log = Database :: get_main_table(TABLE_MAIN_GRADEBOOK_LINKEVAL_LOG);
$t_user=	 Database :: get_main_table(TABLE_MAIN_USER);
$visible_log=Security::remove_XSS($_GET['visiblelog']);
$evaledit = Evaluation :: load($visible_log);
$sql="SELECT le.name,le.description,le.weight,le.visible,le.type,le.created_at,us.username from ".$t_linkeval_log." le inner join ".$t_user." us on le.user_id_log=us.user_id where id_linkeval_log=".$evaledit[0]->get_id()." and type='evaluation';";
$result=Database::query($sql);
$list_info=array();
while ($row=Database::fetch_row($result)) {
	$list_info[]=$row;
}

foreach($list_info as $key => $info_log) {
	$list_info[$key][5]=($info_log[5]) ? api_convert_and_format_date($info_log[5]) : 'N/A';
	$list_info[$key][3]=($info_log[3]==1) ? get_lang('GradebookVisible') : get_lang('GradebookInvisible');
}

$parameters=array('visiblelog'=>Security::remove_XSS($_GET['visiblelog']),'selectcat'=>Security::remove_XSS($_GET['selectcat']));
$table = new SortableTableFromArrayConfig($list_info, 1,20,'gradebookeval');
$table->set_additional_parameters($parameters);

$table->set_header(0, get_lang('GradebookNameLog'));
$table->set_header(1, get_lang('GradebookDescriptionLog'));
$table->set_header(2, get_lang('GradebookPreviousWeight'));
$table->set_header(3, get_lang('GradebookVisibilityLog'));
$table->set_header(4, get_lang('ResourceType'));
$table->set_header(5, get_lang('Date'));
$table->set_header(6, get_lang('GradebookWhoChangedItLog'));

$table->display();
Display :: display_footer();
