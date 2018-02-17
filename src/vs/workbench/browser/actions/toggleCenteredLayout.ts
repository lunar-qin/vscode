/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TPromise } from 'vs/base/common/winjs.base';
import nls = require('vs/nls');
import { Action } from 'vs/base/common/actions';
import { KeyCode, KeyMod, KeyChord } from 'vs/base/common/keyCodes';
import { Registry } from 'vs/platform/registry/common/platform';
import { SyncActionDescriptor } from 'vs/platform/actions/common/actions';
import { IWorkbenchActionRegistry, Extensions } from 'vs/workbench/common/actions';
import { IPartService } from 'vs/workbench/services/part/common/partService';

class ToggleCenteredLayout extends Action {

	public static readonly ID = 'workbench.action.toggleCenteredLayout';
	public static readonly LABEL = nls.localize('toggleCenteredLayout', "Toggle Centered Layout");

	constructor(
		id: string,
		label: string,
		@IPartService private partService: IPartService
	) {
		super(id, label);
		this.enabled = !!this.partService;
	}

	public run(): TPromise<any> {
		this.partService.toggleCenteredLayout();
		return TPromise.as(null);
	}
}

const registry = Registry.as<IWorkbenchActionRegistry>(Extensions.WorkbenchActions);
registry.registerWorkbenchAction(new SyncActionDescriptor(ToggleCenteredLayout, ToggleCenteredLayout.ID, ToggleCenteredLayout.LABEL, { primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KEY_K, KeyCode.KEY_T) }), 'View: Toggle Centered Layout', nls.localize('view', "View"));