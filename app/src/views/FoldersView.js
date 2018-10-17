import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Folder from '../components/Folder/Folder';
import Tabs from '../components/Tabs';
import RecentNotesPanel from '../components/Notes/RecentNotesPanel';
import FolderList from '../components/Folder/FolderList';
import BookmarkedArticles from '../components/RSSPanels/BookmarkedArticles';

class FoldersView extends React.Component {
	render() {
		return (
			<div
				className="folder-view"
				onKeyDown={(e) => e.keyCode === 27 && this.props.history.goBack()}
				tabIndex="-1"
			>
				<Tabs
					componentClass="panels"
					headerClass="panels-header"
					headerComponent={<h1>Folders</h1>}
					tabGroup="folder-view"
				>
					<div tabTitle="All Folders">
						<RecentNotesPanel />
						<FolderList />
					</div>
					<div tabTitle="Tags">{/* <TagsPanel /> */}</div>
					<div tabTitle="Bookmarks">
						<BookmarkedArticles />
					</div>
				</Tabs>

				<div className="border" />

				<Switch>
					<Route component={Folder} path="/folders/:folderID" />

					<Route
						path="/folders"
						render={() => (
							<div className="list content">
								<div className="end">
									Select a folder from panel to see the feeds
								</div>
							</div>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

FoldersView.propTypes = {
	history: PropTypes.shape({
		goBack: PropTypes.func.isRequired,
	}).isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			folderID: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default connect()(FoldersView);
