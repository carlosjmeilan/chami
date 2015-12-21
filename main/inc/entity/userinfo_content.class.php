<?php

namespace Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @license see /license.txt
 * @author autogenerated
 */
class UserinfoContent extends \CourseEntity
{
    /**
     * @return \Entity\Repository\UserinfoContentRepository
     */
     public static function repository(){
        return \Entity\Repository\UserinfoContentRepository::instance();
    }

    /**
     * @return \Entity\UserinfoContent
     */
     public static function create(){
        return new self();
    }

    /**
     * @var integer $c_id
     */
    protected $c_id;

    /**
     * @var integer $id
     */
    protected $id;

    /**
     * @var integer $user_id
     */
    protected $user_id;

    /**
     * @var integer $definition_id
     */
    protected $definition_id;

    /**
     * @var string $editor_ip
     */
    protected $editor_ip;

    /**
     * @var datetime $edition_time
     */
    protected $edition_time;

    /**
     * @var text $content
     */
    protected $content;


    /**
     * Set c_id
     *
     * @param integer $value
     * @return UserinfoContent
     */
    public function set_c_id($value)
    {
        $this->c_id = $value;
        return $this;
    }

    /**
     * Get c_id
     *
     * @return integer 
     */
    public function get_c_id()
    {
        return $this->c_id;
    }

    /**
     * Set id
     *
     * @param integer $value
     * @return UserinfoContent
     */
    public function set_id($value)
    {
        $this->id = $value;
        return $this;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function get_id()
    {
        return $this->id;
    }

    /**
     * Set user_id
     *
     * @param integer $value
     * @return UserinfoContent
     */
    public function set_user_id($value)
    {
        $this->user_id = $value;
        return $this;
    }

    /**
     * Get user_id
     *
     * @return integer 
     */
    public function get_user_id()
    {
        return $this->user_id;
    }

    /**
     * Set definition_id
     *
     * @param integer $value
     * @return UserinfoContent
     */
    public function set_definition_id($value)
    {
        $this->definition_id = $value;
        return $this;
    }

    /**
     * Get definition_id
     *
     * @return integer 
     */
    public function get_definition_id()
    {
        return $this->definition_id;
    }

    /**
     * Set editor_ip
     *
     * @param string $value
     * @return UserinfoContent
     */
    public function set_editor_ip($value)
    {
        $this->editor_ip = $value;
        return $this;
    }

    /**
     * Get editor_ip
     *
     * @return string 
     */
    public function get_editor_ip()
    {
        return $this->editor_ip;
    }

    /**
     * Set edition_time
     *
     * @param datetime $value
     * @return UserinfoContent
     */
    public function set_edition_time($value)
    {
        $this->edition_time = $value;
        return $this;
    }

    /**
     * Get edition_time
     *
     * @return datetime 
     */
    public function get_edition_time()
    {
        return $this->edition_time;
    }

    /**
     * Set content
     *
     * @param text $value
     * @return UserinfoContent
     */
    public function set_content($value)
    {
        $this->content = $value;
        return $this;
    }

    /**
     * Get content
     *
     * @return text 
     */
    public function get_content()
    {
        return $this->content;
    }
}