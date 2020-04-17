/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import * as kamel from './../kamel';
import * as vscode from 'vscode';

export class TraitManager {

    static async provideAvailableTraits(): Promise<vscode.CompletionItem[]> {
        let completions: vscode.CompletionItem[] = [];
        let kamelExe = kamel.create();
        let allTraits = await kamelExe.invoke('help trait --all -o json');
        let traits = JSON.parse(allTraits) as TraitDefinition[];
        for (let trait of traits) {
            let completionBasic: vscode.CompletionItem = {
                label: trait.name,
                insertText: `"${trait.name}"`
            };
            completions.push(completionBasic);
        }
        return Promise.resolve(completions);
    }
}

interface TraitDefinition {
    name: string;
    platform: boolean;
    profiles: string[];
    properties: Property[];
}

interface Property {
    name: string;
    type: string;
    defaultValue?: boolean | number | string;
}