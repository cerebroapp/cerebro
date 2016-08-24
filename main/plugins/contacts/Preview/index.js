import React, { Component } from 'react';
import Block from './Block';
import Row from './Row';
import styles from './styles.css';

/**
 * Convert address object to string
 *
 * @param {Object} address
 * @return {String}
 */
function localeAddress({street, city, state, zip, country, countryCode}) {
  let address = '';
  if (street) address += `${street}, `
  if (zip) address += `${zip} `;
  if (city) address += `${city}`;
  if (country) address += `, ${country}`
  if (countryCode) address += ` (${countryCode})`;
  return address;
}

/**
 * Get user name abbreviation (first letter of name and first letter of surname)
 *
 * @param  {Object} user
 * @return {String}
 */
function abbreviation({ firstName, lastName }) {
  return [firstName, lastName].filter(name => !!name).map(
    name => name.toUpperCase()[0]
  ).join('');
}

export default class Preview extends Component {
  /**
   * Render list of label => value dictionary
   * Like phones, emails or urls
   *
   * @param  {Object} list
   * @return {Component}
   */
  renderList(list) {
    const keys = Object.keys(list);
    const rowRenderer = key => <Row label={key} content={list[key]} />;
    return <Block rowRenderer={rowRenderer} list={keys} />
  }
  renderAddresses() {
    const rowRenderer =({label, ...address}) => (
      <Row label={label} content={localeAddress(address)} />
    );
    return <Block rowRenderer={rowRenderer} list={this.props.addresses} />
  }
  renderServices() {
    const rowRenderer = ({label, serviceName, userName}) => (
      <Row label={label} content={`${userName} (${serviceName})`} />
    ) ;
    return <Block rowRenderer={rowRenderer} list={this.props.services} />
  }
  renderSocialProfiles() {
    const rowRenderer = ({url, service}) => (
      <Row label={service} content={url} />
    );
    return <Block rowRenderer={rowRenderer} list={this.props.socialProfiles} />
  }
  renderBirthday() {
    const { birthday } = this.props;
    if (!birthday) return null;
    const rowRenderer = (date) => (
      <Row label={'birthday'} content={new Date(date).toLocaleDateString()} />
    );
    return <Block rowRenderer={rowRenderer} list={[birthday]} />
  }
  renderHeader() {
    const { firstName, lastName, organization, jobTitle } = this.props;
    return (
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            {abbreviation(this.props)}
          </div>
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.name}>
            {firstName} {lastName}
          </div>
          <div className={styles.job}>
            {jobTitle && <div>{jobTitle}</div>}
            {organization && <div>{organization}</div>}
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { phones, emails, urls } = this.props;
    return (
      <div className={styles.contact}>
        {this.renderHeader()}
        <div className={styles.details}>
          {this.renderList(phones)}
          {this.renderList(emails)}
          {this.renderList(urls)}
          {this.renderBirthday()}
          {this.renderServices()}
          {this.renderSocialProfiles()}
          {this.renderAddresses()}
        </div>
      </div>
    );
  }
}
